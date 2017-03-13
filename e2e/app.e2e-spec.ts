import { Ngbook2ReduxChatPage } from './app.po';

describe('ngbook2-redux-chat App', () => {
  let page: Ngbook2ReduxChatPage;

  beforeEach(() => {
    page = new Ngbook2ReduxChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
