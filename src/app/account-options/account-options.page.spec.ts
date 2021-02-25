import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountOptionsPage } from './account-options.page';

describe('AccountOptionsPage', () => {
  let component: AccountOptionsPage;
  let fixture: ComponentFixture<AccountOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
