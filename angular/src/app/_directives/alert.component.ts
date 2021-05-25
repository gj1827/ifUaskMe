import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../services';

@Component({
    selector: 'alert',
    template: `
    <div *ngIf="message" [ngClass]="{ 'alert': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }">{{message.text}}
    </div>`,
    styles: [
        `
        .alert{
            position: relative;
            padding: .75rem 1.25rem;
            margin-bottom: 1rem;
            border: 1px solid transparent;
            border-radius: .25rem;
            text-align: center;
            margin: 10px auto;
            max-width: 400px;
        }
        .alert-danger{
            color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;
        }
        .alert-success{
            color: #155724;
            background-color: #d4edda;
            border-color: #c3e6cb;
        }
        `
    ]
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription!: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe((message: any) => {
            this.message = message;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}