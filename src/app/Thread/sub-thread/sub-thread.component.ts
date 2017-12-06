import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubThread } from './sub-thread.model';
import { ThreadDataService } from '../thread-data.service';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-sub-thread',
  templateUrl: './sub-thread.component.html',
  styleUrls: ['./sub-thread.component.css']
})
export class SubThreadComponent implements OnInit {
  @Input() public subThread: SubThread;
  @Output() public subThreadDeleted = new EventEmitter<SubThread>();
  @Input() public hoofdThreadMaker: string;

  constructor(private _auth: AuthenticationService, private _threadDataService: ThreadDataService) { }

  ngOnInit() { }

  public onDeleteClick(){
    this._threadDataService.removeSubThread(this.subThread.id).subscribe(response => {
      this.subThreadDeleted.emit(this.subThread);
    });
  }

  public get canDelete(): boolean{
    return this.subThread.username === this._auth.user$.getValue() || this.hoofdThreadMaker === this._auth.user$.getValue();
  }
}