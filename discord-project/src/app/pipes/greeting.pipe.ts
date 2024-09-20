import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'greeting',
  standalone: true
})
export class GreetingPipe implements PipeTransform {

  transform(value: any, greetingMessage = "Merhaba, ", lastMessage = ""): string {
    return greetingMessage + value + lastMessage;
  }

}
