import { ConnectFormDirective } from './connect-form.directive';
import { FormControlDirective } from '@angular/forms';

describe('ConnectFormDirective', () => {
  it('should create an instance', () => {
    const directive = new ConnectFormDirective(null);
    expect(directive).toBeTruthy();
  });
});
