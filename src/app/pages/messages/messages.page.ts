import { Component, OnInit, OnDestroy } from '@angular/core';
import { Messages } from 'src/app/services/messages';
import { Thread } from 'src/app/models/message';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
  standalone: false,
})
export class MessagesPage implements OnInit, OnDestroy {
  threads: Thread[] = [];
  visibleThreads: Thread[] = [];
  private sub = new Subscription();

  constructor(private messagesSvc: Messages, private router: Router) {}

  ngOnInit() {
      const s = this.messagesSvc.getThreads().subscribe(ts => {
      this.threads = ts;
      this.visibleThreads = ts;
    });
    this.sub.add(s);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSearch(event: any) {
    const query = event.target.value.trim();
    if (query) {
      this.router.navigate(['/search', query]); // 🔎 redirige a Search Page
    }
  }

  openThread(thread: Thread) {
    // La vista de thread aún no está implementada en tu proyecto; puedes crear /pages/message-thread más adelante.
    // Por ahora podemos navegar a una ruta que no existe o la podemos dejar para implementar luego.
    this.router.navigate(['/messages', thread.id]); // ejemplo: /messages/<id>
  }

  trackById(i:number, t:Thread) { return t.id; }
}


