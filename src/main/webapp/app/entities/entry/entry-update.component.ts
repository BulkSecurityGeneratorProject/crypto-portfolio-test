import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IEntry, Entry } from 'app/shared/model/entry.model';
import { EntryService } from './entry.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-entry-update',
  templateUrl: './entry-update.component.html'
})
export class EntryUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];
  dateDp: any;
  model2: Date;

  editForm = this.fb.group({
    id: [],
    currency: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    date: [],
    wallet: [],
    currentPrice: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected entryService: EntryService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ entry }) => {
      this.updateForm(entry);
    });

    this.model2 = new Date();

    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(entry: IEntry) {
    this.editForm.patchValue({
      id: entry.id
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const entry = this.createFromForm();
    if (entry.id !== undefined) {
      this.subscribeToSaveResponse(this.entryService.update(entry));
    } else {
      this.subscribeToSaveResponse(this.entryService.create(entry));
    }
  }

  private createFromForm(): IEntry {
    return {
      ...new Entry(),
      id: this.editForm.get(['id']).value,
      currency: this.editForm.get(['currency']).value,
      amount: this.editForm.get(['amount']).value,
      date: this.editForm.get(['date']).value,
      wallet: this.editForm.get(['wallet']).value,
      currentPrice: this.editForm.get(['currentPrice']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntry>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
