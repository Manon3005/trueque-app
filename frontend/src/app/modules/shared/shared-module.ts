import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MessageItemComponent } from '../../components/message-item/message-item.component';
import { ChatInputComponent } from '../../components/chat-input/chat-input.component';
import { MessageBubleComponent } from '../../components/message-buble/message-buble.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent, HeaderComponent, TabsComponent, ProductCardComponent, MessageItemComponent, ChatInputComponent, MessageBubleComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [InputComponent, HeaderComponent, TabsComponent, ProductCardComponent, MessageItemComponent, ChatInputComponent, MessageBubleComponent]
})
export class SharedModule { }
