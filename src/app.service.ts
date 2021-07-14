import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {

  shutdownListener$: Subject<void> = new Subject<void>();

  constructor(
  ) {
  }

  subscribeToShutdown(shutdownFn: () => void): void {
    this.shutdownListener$.subscribe(() => shutdownFn());
  }

  // Emit the shutdown event
  shutdown() {
    this.shutdownListener$.next();
  }

}
