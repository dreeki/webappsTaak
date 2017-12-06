import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ThreadDataService } from '../thread-data.service';
import { Thread } from '../thread.model';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.css']
})
export class AddThreadComponent implements OnInit {
  public threadForm: FormGroup;

  constructor(private fb: FormBuilder, private _threadDataService: ThreadDataService, 
    private router: Router, private auth: AuthenticationService) { 
    }

  ngOnInit() {
    this.threadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(){
    const newThread = new Thread(this.threadForm.value.title, this.threadForm.value.description, new Date(), this._threadDataService.username);
    this._threadDataService.addNewThread(newThread).subscribe(response => {
      this.router.navigate(['/threads/']);
    });
  }
}
