import { DashModule } from './dash.module';

describe('DashModule', () => {
  let dashModule: DashModule;

  beforeEach(() => {
    dashModule = new DashModule();
  });

  it('should create an instance', () => {
    expect(dashModule).toBeTruthy();
  });
});
