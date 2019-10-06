import { ToEmojiPipe } from './to-emoji.pipe';

describe('ToEmojiPipe', () => {
  it('create an instance', () => {
    const pipe = new ToEmojiPipe();
    expect(pipe).toBeTruthy();
  });
});
