import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FullPostPage } from './full-post.page';

describe('FullPostPage', () => {
  let component: FullPostPage;
  let fixture: ComponentFixture<FullPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FullPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
