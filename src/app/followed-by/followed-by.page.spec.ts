import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FollowedByPage } from './followed-by.page';

describe('FollowedByPage', () => {
  let component: FollowedByPage;
  let fixture: ComponentFixture<FollowedByPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowedByPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowedByPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
