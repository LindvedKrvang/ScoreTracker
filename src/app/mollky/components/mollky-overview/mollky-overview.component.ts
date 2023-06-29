import {Component, OnInit} from '@angular/core';
import {Game, Mollky} from '../../../shared/model/Game';
import {PlayerService} from '../../../shared/services/player.service';
import {AlertController, NavController} from '@ionic/angular';
import {MollkyPlayer, MollkyPlayerMetaData} from '../../model/mollky-player-meta-data';

@Component({
  selector: 'app-mollky-overview',
  templateUrl: './mollky-overview.component.html',
  styleUrls: ['./mollky-overview.component.scss'],
})
export class MollkyOverviewComponent  implements OnInit {

  public game: Game = Mollky
  public players: MollkyPlayer[] = []
  public sortByScore: boolean = false
  public currentPlayer?: MollkyPlayer
  public enoughViablePlayers: boolean = true

  constructor(
    private playerService: PlayerService,
    private navController: NavController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {}

  ionViewWillEnter(): void {
    this.fetchPlayers();
  }

  private fetchPlayers(): void {
    this.playerService.getAllPlayers().then(players => {
      this.players = players as MollkyPlayer[];
      this.assignMetaDataIfMissing()
      this.selectCurrentPlayer()
      this.checkEnoughViablePlayers()
    });
  }

  assignMetaDataIfMissing(): void {
    this.players = this.players.map((player, index) => {
      if (!!player.gameMetaData) {
        return player
      }
      player.gameMetaData = {
        isCurrentPlayer: index === 0,
        amountOfMisses: 0,
        isEliminated: false
      } as MollkyPlayerMetaData
      return player
    })
    this.playerService.updateAllPlayers(this.players)
  }

  selectCurrentPlayer(): void {
    this.currentPlayer = this.players.find(player => player.gameMetaData.isCurrentPlayer)
  }

  checkEnoughViablePlayers(): void {
    const viablePlayers = this.players.filter(player => !player.gameMetaData.hasWon && !player.gameMetaData.isEliminated)
    this.enoughViablePlayers = viablePlayers.length > 1
  }

  goBack(): void {
    this.navController.back()
  }

  goToScore(): void {
    this.navController.navigateForward(`${this.game.gameType}/score/players/${this.currentPlayer?.id}`)
  }

  async startNewGame(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm',
      subHeader: 'Start a new game?',
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
          handler: () => {
            this.playerService.newGame()
            this.navController.back()
          }
        }
      ]
    })
    alert.present()
  }

  getColorForName(player: MollkyPlayer): string {
    if (player.gameMetaData.hasWon) {
      return 'success'
    }
    if (player.gameMetaData.isEliminated) {
      return 'danger'
    }
    if (player.gameMetaData.isCurrentPlayer) {
      return 'primary'
    }
    return 'medium'
  }

  getMissArrayForPlayer(player: MollkyPlayer): number[] {
    return new Array(player.gameMetaData.amountOfMisses)
  }
}
