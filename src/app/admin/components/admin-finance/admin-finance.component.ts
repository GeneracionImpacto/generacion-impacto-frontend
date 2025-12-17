import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { AdminService } from '../../../services/admin.service';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-admin-finance',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar [role]="role" [routes]="routes"></app-navbar>
    <div class="container">
      <h1>Finanzas</h1>
      <div class="summary-cards">
        <div class="card">
          <h3>Ingresos Totales</h3>
          <p class="amount positive">S/ {{ financeData.totalEarnings?.toFixed(2) || '0.00' }}</p>
        </div>
        <div class="card">
          <h3>Gastos Totales</h3>
          <p class="amount negative">S/ {{ financeData.totalExpenses?.toFixed(2) || '0.00' }}</p>
        </div>
        <div class="card">
          <h3>Ganancia Neta</h3>
          <p class="amount" [class]="(financeData.netProfit || 0) >= 0 ? 'positive' : 'negative'">
            S/ {{ financeData.netProfit?.toFixed(2) || '0.00' }}
          </p>
        </div>
      </div>
      <h2>Movimientos</h2>
      <div *ngFor="let payment of financeData.payments" class="card">
        <p><strong>Tutor:</strong> {{ payment.tutor?.name }}</p>
        <p><strong>Monto:</strong> S/ {{ payment.amount?.toFixed(2) }}</p>
        <p><strong>Fecha:</strong> {{ payment.paymentDate | date }}</p>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 40px 20px; }
    h1 { color: var(--primary-blue); margin-bottom: 30px; }
    .summary-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .amount { font-size: 2rem; font-weight: bold; }
    .positive { color: var(--success-green); }
    .negative { color: var(--error-red); }
  `]
})
export class AdminFinanceComponent implements OnInit {
  role = Role.ADMIN;
  routes = [
    { path: '/admin/home', label: 'Inicio' },
    { path: '/admin/tutors', label: 'Tutores' },
    { path: '/admin/students', label: 'Estudiantes' },
    { path: '/admin/notifications', label: 'Notificaciones' },
    { path: '/admin/finance', label: 'Finanzas' }
  ];
  
  financeData: any = {};

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getFinanceSummary().subscribe({
      next: (data) => this.financeData = data,
      error: (err) => console.error(err)
    });
  }
}




