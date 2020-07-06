import {Component, OnInit} from '@angular/core';
import {Game, Whist} from '../../../shared/model/Game';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Call, Calls, CallType} from '../../model/Call';
import {PlayerService} from '../../../shared/services/player.service';
import {Player} from '../../../shared/model/Player';
import {WhistCalculatorService} from '../../services/whist-calculator.service';
import {NavController} from '@ionic/angular';
import {GameRound} from '../../../shared/model/GameRound';

const NO_PARTNER = 'No partner';

@Component({
    selector: 'app-calculate-whist-score',
    templateUrl: './calculate-whist-score.component.html',
    styleUrls: ['./calculate-whist-score.component.scss'],
})
export class CalculateWhistScoreComponent implements OnInit {

    public players: Player[] = [];
    public remainingPlayers: Player[] = [];
    public game: Game = Whist;
    public calls: Call[] = Calls;
    public validTargetSticks: number[] = [7, 8, 9, 10, 11, 12, 13];
    public validAcquiredSticks: number[] = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    public form: FormGroup;

    public CallType: typeof CallType = CallType;

    constructor(private fb: FormBuilder,
                private playerService: PlayerService,
                private whistCalculatorService: WhistCalculatorService,
                private navController: NavController) {
    }

    ngOnInit(): void {
        this.playerService.getAllPlayers().then(players => this.players = players);
        this.form = this.fb.group({
            call: [null, Validators.required],
            caller: [null, Validators.required],
            partner: null,
            targetSticks: null,
            acquiredSticks: null,
            sunWinningCondition: null
        });
        this.updateValidators();
        this.updatePartner();
    }

    private updateValidators(): void {
        this.form.get('call').valueChanges.subscribe((selectedCall: Call) => {
            switch (selectedCall.majorType) {
                case CallType.REGULAR: {
                    this.updateValidator('partner', Validators.required);
                    this.updateValidator('targetSticks', Validators.required);
                    this.updateValidator('acquiredSticks', Validators.required);
                    this.updateValidator('sunWinningCondition', null);
                    break;
                }
                case CallType.SUN: {
                    this.updateValidator('partner', null);
                    this.updateValidator('targetSticks', null);
                    this.updateValidator('acquiredSticks', null);
                    this.updateValidator('sunWinningCondition', Validators.required);
                    break;
                }
            }
        });
    }

    private updateValidator(control: string, validator: ValidatorFn): void {
        this.form.get(control).setValidators(validator);
        this.form.get(control).updateValueAndValidity();
    }

    private updatePartner(): void {
        this.form.get('caller').valueChanges.subscribe((selectedPlayer) => {
            if (!selectedPlayer) {
                return;
            }
            if (this.partner && this.partner.id === selectedPlayer.id) {
                this.form.get('partner').setValue(null);
            }
            this.remainingPlayers = this.players;
            this.remainingPlayers = this.remainingPlayers.filter(player => player.id !== selectedPlayer.id);
            this.remainingPlayers.push({
                name: NO_PARTNER,
                id: -1
            } as Player);
        });
    }

    public handleCalculateClicked(): void {
        this.whistCalculatorService.calculateScore(this.form.value, this.players);
        this.playerService.updateAllPlayers(this.players);
        this.playerService.addGameRound({players: this.players} as GameRound);
        this.navController.back();
    }

    get call(): Call {
        return this.form.get('call').value;
    }

    get targetSticks(): number {
        return this.form.get('targetSticks').value;
    }

    get partner(): Player {
        return this.form.get('partner').value;
    }

    get caller(): Player {
        return this.form.get('caller').value;
    }
}
