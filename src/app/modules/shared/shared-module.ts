import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { MessageItemComponent } from 'src/app/components/message-item/message-item.component';
import { ChatInputComponent } from 'src/app/components/chat-input/chat-input.component';
import { MessageBubleComponent } from 'src/app/components/message-buble/message-buble.component';
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
