import { OnlineCheckPage } from './app.po';

describe('online-check App', function() {
  let page: OnlineCheckPage;

  beforeEach(() => {
    page = new OnlineCheckPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
