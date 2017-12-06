import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThreadDataService } from '../thread-data.service';
import { SubThread } from '../sub-thread/sub-thread.model';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-add-sub-thread',
  templateUrl: './add-sub-thread.component.html',
  styleUrls: ['./add-sub-thread.component.css']
})
export class AddSubThreadComponent implements OnInit {
  @Input() public threadId: string;
  @Output() public subThreadAdded = new EventEmitter<SubThread>();
  public subThreadForm: FormGroup;
  public inhoud: string;
  public errormessage: string;
  private _currentUser: string;

  constructor(private _auth: AuthenticationService, private fb: FormBuilder, private _threadDataService: ThreadDataService, private router: Router) { }


  ngOnInit() {
    this._currentUser = this._auth.user$.getValue();
    this.inhoud = '';
    this.subThreadForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.inhoud.trim() !== '') {
      const newSubThread = new SubThread(this.subThreadForm.value.description, new Date(), this._threadDataService.username);
      this._threadDataService.addNewSubThread(newSubThread, this.threadId).subscribe(response => {
        this.subThreadAdded.emit(newSubThread);
        this.inhoud = '';
        this.errormessage = '';
      }, error => {
        this.errormessage = 'ier se doar se, tis kapot';
      });
    }
  }

	public get currentUser(): string {
		return this._currentUser;
	}


}
