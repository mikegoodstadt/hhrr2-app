import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelspaced'
})
export class CamelSpaced implements PipeTransform {

  /**
   * Converts camelcase to spaced words
   * @param camel string
   */
  transform(camel: string): string {
    const words = camel.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    // return words.charAt(0).toUpperCase() + words.substring(1);
    return words.charAt(0) + words.substring(1);
  }

}
