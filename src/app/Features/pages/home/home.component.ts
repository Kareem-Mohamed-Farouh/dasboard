import { Component, signal, WritableSignal } from '@angular/core';
import { FirebaseService } from '../../../core/services/firebase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supply } from '../../../shared/intterface';
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private firebaseService: FirebaseService) {}

  supplies: Supply[] = [];

  filteredSupplies: Supply[] = [];
  searchTerm = '';
  editId: string | null = null;

  newSupply: Supply = {
    name: '',
    baseQuantity: 0,
    usedQuantity: 0,
    extraQuantity: 0,
    addedDate: new Date().toISOString().split('T')[0],
    price: 0,
  };

  async ngOnInit() {
    await this.loadSupplies();
  }
  async loadSupplies() {
    this.supplies = await this.firebaseService.getAll();
    this.filteredSupplies = [...this.supplies];
  }
  increment(field: 'baseQuantity' | 'usedQuantity' | 'extraQuantity') {
    this.newSupply[field]++;
  }

  decrement(field: 'baseQuantity' | 'usedQuantity' | 'extraQuantity') {
    if (this.newSupply[field] > 0) {
      this.newSupply[field]--;
    }
  }

  async addOrUpdateSupply() {
    if (this.editId) {
      await this.firebaseService.update(this.editId, this.newSupply);
    } else {
      await this.firebaseService.create(this.newSupply);
    }
    this.resetForm();
    await this.loadSupplies();
  }

  async deleteSupply(id: string) {
    await this.firebaseService.delete(id);
    await this.loadSupplies();
  }

  editSupply(supply: Supply) {
    this.editId = supply.id || null;
    this.newSupply = { ...supply };
  }

  searchSupplies() {
    this.filteredSupplies = this.supplies.filter((supply) =>
      supply.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  resetForm() {
    this.editId = null;
    this.newSupply = {
      name: '',
      baseQuantity: 0,
      usedQuantity: 0,
      extraQuantity: 0,
      addedDate: new Date().toISOString().split('T')[0],
      price: 0,
    };
  }
}
