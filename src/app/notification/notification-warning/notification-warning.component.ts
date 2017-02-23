import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-notification-warning',
  templateUrl: './notification-warning.component.html',
  styleUrls: ['./notification-warning.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class NotificationWarningComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private notificationService: NotificationService) { }

  ngOnInit() { }

}

