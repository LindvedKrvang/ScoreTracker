import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Game, Mollky} from '../../../shared/model/Game';
import {PlayerService} from '../../../shared/services/player.service';
import {MollkyPlayer} from '../../model/mollky-player-meta-data';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {ScoreService} from '../../../shared/services/score.service';

const POINTS_REQUIRED_FOR_WINNING: number = 50
const POINTS_TO_START_OVER_FROM: number = 25

const MISSES_REQUIRED_TO_LOSE: number = 3

@Component({
  selector: 'app-score',
  templateUrl: './molky-score.component.html',
  styleUrls: ['./mollky-score.component.scss'],
})
export class MollkyScoreComponent implements OnInit {

  public game: Game = Mollky
  public currentPlayer?: MollkyPlayer
  public missesForCurrentPlayer: number[] = []

  public title: string = this.game.name

  private allPlayers: MollkyPlayer[] = []

  public availableScores: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
  ]

  constructor(
      private route: ActivatedRoute,
      private navController: NavController,
      private playerService: PlayerService,
      private scoreService: ScoreService,
      private alertController: AlertController,
      private toastController: ToastController
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter(): void {
    const playerId: string | null = this.route.snapshot.paramMap.get('playerId');
    this.playerService.getAllPlayers().then(players => {
      this.allPlayers = players as MollkyPlayer[]
      this.currentPlayer = this.allPlayers.find(player => player.id === Number(playerId))
      this.missesForCurrentPlayer = new Array(this.currentPlayer?.gameMetaData.amountOfMisses)
      this.createTitle()
    })
  }

  createTitle() {
    this.title = `${this.game.name} - Select score for: ${this.currentPlayer?.name}`
  }

  showMisses(): boolean {
    return !!this.currentPlayer?.gameMetaData?.amountOfMisses
      && this.currentPlayer.gameMetaData.amountOfMisses > 0
  }

  goBack(): void {
    this.navController.back()
  }

  async onScoreClicked(scoreToAssign: number): Promise<void> {
    this.showConfirmAlert(
      `Assign ${scoreToAssign} point${scoreToAssign > 1 ? 's': ''} to ${this.currentPlayer?.name}?`,
      () => {
        this.assignScoreToPlayer(scoreToAssign)
      }
    )
  }

  async showConfirmAlert(message: string, onConfirm: () => void): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm',
      subHeader: message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => onConfirm()
        }
      ]
    })
    alert.present()
  }

  assignScoreToPlayer(scoreToAssign: number): void {
    this.scoreService.addScore(this.currentPlayer!, scoreToAssign)
    this.removeMisses()
    this.checkWinCondition()
    this.findNextPlayer()
    this.playerService.updateAllPlayers(this.allPlayers)
    this.navController.back()
  }

  removeMisses(): void {
    this.currentPlayer!.gameMetaData.amountOfMisses = 0
  }

  checkWinCondition(): void {
    if (this.currentPlayer!.score === POINTS_REQUIRED_FOR_WINNING) {
      const winnersBeforePlayer = this.allPlayers.filter(player => player.gameMetaData.hasWon).length + 1;
      const message = `Congratulations! ${this.currentPlayer?.name} is the ${winnersBeforePlayer}${this.getNumberPostFix(winnersBeforePlayer)} person to win`
      this.currentPlayer!.gameMetaData.hasWon = true
      this.playerService.updateAllPlayers(this.allPlayers)
      this.showToast(message)
      return
    }
    if (this.currentPlayer!.score > POINTS_REQUIRED_FOR_WINNING) {
      const message = `${this.currentPlayer?.name} has exceeded the ${POINTS_REQUIRED_FOR_WINNING} points with ${this.currentPlayer!.score - POINTS_REQUIRED_FOR_WINNING} and has been reset to ${POINTS_TO_START_OVER_FROM} points`
      this.scoreService.setScore(this.currentPlayer!, POINTS_TO_START_OVER_FROM)
      this.showToast(message)
    }
  }

  private getNumberPostFix(value: number): string {
    if (value === 1) {
      return 'st'
    }
    if (value === 2) {
      return 'nd'
    }
    if (value === 3) {
      return 'rd'
    }
    return 'th'
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'middle'
    })
    toast.present()
  }

  findNextPlayer(): void {
    const nextPlayer = this.allPlayers
      .filter(player => this.isPlayingPlayer(player))
      .reduce((prevPlayer, currentPlayer) => {
        const prevIsHigher: boolean = prevPlayer.id > this.currentPlayer!.id;
        const currentIsHigher: boolean = currentPlayer.id > this.currentPlayer!.id
        if (prevIsHigher && currentIsHigher) {
          return prevPlayer.id < currentPlayer.id ? prevPlayer : currentPlayer
        }
        if (prevIsHigher) {
          return prevPlayer
        }
        if (currentIsHigher) {
          return currentPlayer
        }
        return this.currentPlayer!
    })

    if (nextPlayer.id === this.currentPlayer!.id) {
      this.allPlayers
        .filter(player => this.isPlayingPlayer(player))
        .reduce((prevPlayer, currentPlayer) => {
          return prevPlayer.id < currentPlayer.id ? prevPlayer : currentPlayer
        }
      ).gameMetaData.isCurrentPlayer = true
    } else {
      this.allPlayers.find(player => player.id === nextPlayer.id)!.gameMetaData.isCurrentPlayer = true
    }
    this.currentPlayer!.gameMetaData.isCurrentPlayer = false
  }

  private isPlayingPlayer(player: MollkyPlayer): boolean {
    return !player.gameMetaData.isEliminated && !player.gameMetaData.hasWon
  }

  onAssignMissClicked(): void {
    this.showConfirmAlert(
      `Assign a miss to ${this.currentPlayer?.name}`,
      () => this.assignMissToPlayer()
    )
  }

  assignMissToPlayer(): void {
    this.currentPlayer!.gameMetaData.amountOfMisses = ++this.currentPlayer!.gameMetaData.amountOfMisses
    this.checkTooManyMisses()
    this.findNextPlayer()
    this.playerService.updateAllPlayers(this.allPlayers)
    this.navController.back()
  }

  checkTooManyMisses(): void {
    if (this.currentPlayer!.gameMetaData.amountOfMisses < MISSES_REQUIRED_TO_LOSE) {
      return
    }
    this.currentPlayer!.gameMetaData.isEliminated = true
    const message = `${this.currentPlayer?.name} got ${MISSES_REQUIRED_TO_LOSE} misses and is no longer in the game`
    this.showToast(message)
  }
}
