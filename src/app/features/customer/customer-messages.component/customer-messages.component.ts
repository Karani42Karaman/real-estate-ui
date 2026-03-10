import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: number;
  otherUserId: number;
  otherUserName: string;
  otherUserInitials: string;
  otherUserAvatar?: string;
  otherUserType: 'owner' | 'buyer';
  propertyId: number;
  propertyTitle: string;
  propertyPrice: string;
  propertyImage: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

@Component({
  selector: 'app-customer-messages',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './customer-messages.component.html',
  styleUrls: ['./customer-messages.component.scss']
})
export class CustomerMessagesComponent implements OnInit, AfterViewChecked {

  @ViewChild('messageContainer') messageContainer!: ElementRef;

  isMobileSidebarOpen = false;
  showChatOnMobile = false;
  newMessage = '';
  searchQuery = '';

  currentUser = {
    id: 999,
    name: 'Kullanıcı Adı',
    email: 'kullanici@emlaknet.com',
    initials: 'KA'
  };

  selectedConversation: Conversation | null = null;

  conversations: Conversation[] = [
    {
      id: 1,
      otherUserId: 1,
      otherUserName: 'Mehmet Yılmaz',
      otherUserInitials: 'MY',
      otherUserType: 'owner',
      propertyId: 101,
      propertyTitle: 'Kadıköy 3+1 Daire',
      propertyPrice: '8.500.000 ₺',
      propertyImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      lastMessage: 'Evet, hafta sonu müsaitim. Cumartesi öğleden sonra uygun olur mu?',
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 2,
      messages: [
        { id: 1, senderId: 1, text: 'Merhaba, ilanınızla ilgileniyorum. Dairenin aylık aidat miktarı ne kadar?', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), isRead: true },
        { id: 2, senderId: 999, text: 'Merhaba! Aylık aidat 850 TL. Site içinde kapalı otopark da dahil.', timestamp: new Date(Date.now() - 1.8 * 60 * 60 * 1000), isRead: true },
        { id: 3, senderId: 1, text: 'Harika, yerinde görmek mümkün mü? Ne zaman müsaitsiniz?', timestamp: new Date(Date.now() - 30 * 60 * 1000), isRead: true },
        { id: 4, senderId: 999, text: 'Tabii ki! Bu hafta sonu ya da önümüzdeki hafta içi uygun.', timestamp: new Date(Date.now() - 20 * 60 * 1000), isRead: true },
        { id: 5, senderId: 1, text: 'Evet, hafta sonu müsaitim. Cumartesi öğleden sonra uygun olur mu?', timestamp: new Date(Date.now() - 5 * 60 * 1000), isRead: false },
      ]
    },
    {
      id: 2,
      otherUserId: 2,
      otherUserName: 'Ayşe Kara',
      otherUserInitials: 'AK',
      otherUserType: 'buyer',
      propertyId: 102,
      propertyTitle: 'Beşiktaş 2+1 Kiralık',
      propertyPrice: '18.000 ₺/ay',
      propertyImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      lastMessage: 'Depozito kaç aylık alıyorsunuz?',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 1,
      messages: [
        { id: 1, senderId: 2, text: 'Merhaba, kiralık daire için yazıyorum. Hala müsait mi?', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), isRead: true },
        { id: 2, senderId: 999, text: 'Merhaba Ayşe Hanım, evet daire hala müsait.', timestamp: new Date(Date.now() - 4.5 * 60 * 60 * 1000), isRead: true },
        { id: 3, senderId: 2, text: 'Depozito kaç aylık alıyorsunuz?', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), isRead: false },
      ]
    },
    {
      id: 3,
      otherUserId: 3,
      otherUserName: 'Can Demir',
      otherUserInitials: 'CD',
      otherUserType: 'buyer',
      propertyId: 103,
      propertyTitle: 'Çankaya Villa',
      propertyPrice: '12.000.000 ₺',
      propertyImage: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      lastMessage: 'Teşekkürler, değerlendireceğim.',
      lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      unreadCount: 0,
      messages: [
        { id: 1, senderId: 3, text: 'Villa hakkında detaylı bilgi alabilir miyim?', timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000), isRead: true },
        { id: 2, senderId: 999, text: '320m², 5+2, özel havuzlu ve bahçeli. İstediğiniz zaman gezebilirsiniz.', timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000), isRead: true },
        { id: 3, senderId: 3, text: 'Teşekkürler, değerlendireceğim.', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), isRead: true },
      ]
    },
    {
      id: 4,
      otherUserId: 4,
      otherUserName: 'Elif Şahin',
      otherUserInitials: 'EŞ',
      otherUserType: 'buyer',
      propertyId: 104,
      propertyTitle: 'Nilüfer 4+1 Daire',
      propertyPrice: '4.750.000 ₺',
      propertyImage: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      lastMessage: 'Anlaşıldı, iyi günler.',
      lastMessageTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      unreadCount: 0,
      messages: [
        { id: 1, senderId: 4, text: 'Merhaba, tapu durumu nasıl? Kat irtifakı mı kat mülkiyeti mi?', timestamp: new Date(Date.now() - 3.2 * 24 * 60 * 60 * 1000), isRead: true },
        { id: 2, senderId: 999, text: 'Kat mülkiyeti alınmış, herhangi bir sorun yok.', timestamp: new Date(Date.now() - 3.1 * 24 * 60 * 60 * 1000), isRead: true },
        { id: 3, senderId: 4, text: 'Anlaşıldı, iyi günler.', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), isRead: true },
      ]
    }
  ];

  get filteredConversations(): Conversation[] {
    if (!this.searchQuery.trim()) return this.conversations;
    const q = this.searchQuery.toLowerCase();
    return this.conversations.filter(c =>
      c.otherUserName.toLowerCase().includes(q) ||
      c.propertyTitle.toLowerCase().includes(q)
    );
  }

  get totalUnread(): number {
    return this.conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  }

  ngOnInit(): void {
    if (this.conversations.length > 0) {
      this.selectConversation(this.conversations[0]);
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  constructor(private router: Router) {}

  selectConversation(conv: Conversation): void {
    this.selectedConversation = conv;
    conv.unreadCount = 0;
    conv.messages.forEach(m => m.isRead = true);
    this.showChatOnMobile = true;
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.selectedConversation) return;
    const msg: Message = {
      id: Date.now(),
      senderId: this.currentUser.id,
      text: this.newMessage.trim(),
      timestamp: new Date(),
      isRead: true
    };
    this.selectedConversation.messages.push(msg);
    this.selectedConversation.lastMessage = msg.text;
    this.selectedConversation.lastMessageTime = msg.timestamp;
    this.newMessage = '';
  }

  scrollToBottom(): void {
    try {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    } catch {}
  }

  backToList(): void {
    this.showChatOnMobile = false;
  }

  formatTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return 'Şimdi';
    if (mins < 60) return `${mins} dk`;
    if (hours < 24) return `${hours} sa`;
    if (days === 1) return 'Dün';
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  }

  formatMessageTime(date: Date): string {
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  }

  isSameDay(d1: Date, d2: Date): boolean {
    return d1.toDateString() === d2.toDateString();
  }

  getMessageGroups() {
    if (!this.selectedConversation) return [];
    const messages = this.selectedConversation.messages;
    const groups: { date: Date; messages: Message[] }[] = [];
    messages.forEach(msg => {
      const last = groups[groups.length - 1];
      if (!last || !this.isSameDay(last.date, msg.timestamp)) {
        groups.push({ date: msg.timestamp, messages: [msg] });
      } else {
        last.messages.push(msg);
      }
    });
    return groups;
  }

  formatGroupDate(date: Date): string {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 86400000);
    if (diff === 0) return 'Bugün';
    if (diff === 1) return 'Dün';
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
  }

  isCurrentUser(senderId: number): boolean {
    return senderId === this.currentUser.id;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  toggleMobileSidebar(): void { this.isMobileSidebarOpen = !this.isMobileSidebarOpen; }
  closeMobileSidebar(): void { this.isMobileSidebarOpen = false; }
  logout(): void { this.router.navigate(['/auth/login']); }
}