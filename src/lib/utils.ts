import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function spanishify(text: string) {
  return text
    .replaceAll('a>', 'á')
    .replaceAll('e>', 'é')
    .replaceAll('i>', 'í')
    .replaceAll('o>', 'ó')
    .replaceAll('u>', 'ú')
    .replaceAll('A>', 'Á')
    .replaceAll('E>', 'É')
    .replaceAll('I>', 'Í')
    .replaceAll('O>', 'Ó')
    .replaceAll('U>', 'Ú')
    .replaceAll('a<', 'à')
    .replaceAll('e<', 'è')
    .replaceAll('i<', 'ì')
    .replaceAll('o<', 'ò')
    .replaceAll('u<', 'ù')
    .replaceAll('A<', 'À')
    .replaceAll('E<', 'È')
    .replaceAll('I<', 'Ì')
    .replaceAll('O<', 'Ò')
    .replaceAll('U<', 'Ù')
    .replaceAll('n>', 'ñ')
    .replaceAll('N>', 'Ñ')
    .replaceAll('?>', '¿')
    .replaceAll('!>', '¡')

    .replaceAll('á<', 'a')
    .replaceAll('é<', 'e')
    .replaceAll('í<', 'i')
    .replaceAll('ó<', 'o')
    .replaceAll('ú<', 'u')
    .replaceAll('Á<', 'A')
    .replaceAll('É<', 'E')
    .replaceAll('Í<', 'I')
    .replaceAll('Ó<', 'O')
    .replaceAll('Ú<', 'U')

    .replaceAll('à>', 'a')
    .replaceAll('è>', 'e')
    .replaceAll('ì>', 'i')
    .replaceAll('ò>', 'o')
    .replaceAll('ù>', 'u')
    .replaceAll('À>', 'A')
    .replaceAll('È>', 'E')
    .replaceAll('Ì>', 'I')
    .replaceAll('Ò>', 'O')
    .replaceAll('Ù>', 'U')

    .replaceAll('ñ<', 'n')
    .replaceAll('Ñ<', 'N')
    .replaceAll('¿<', '?')
    .replaceAll('¡<', '!')
}