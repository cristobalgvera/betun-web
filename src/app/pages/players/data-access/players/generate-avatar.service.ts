import { Injectable } from '@angular/core';
import { lorelei } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { PlayerDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class GenerateAvatarService {
  private static readonly BACKGROUND_COLORS = [
    '#fecdd3',
    '#f5d0fe',
    '#c7d2fe',
    '#bae6fd',
    '#a5f3fc',
    '#a7f3d0',
    '#d9f99d',
    '#fef08a',
    '#fed7aa',
  ].map((color) => color.substring(1));

  private readonly colorsToSelect = [
    ...GenerateAvatarService.BACKGROUND_COLORS,
  ];

  generateAvatarUri(): PlayerDto['avatarUri'] {
    const avatar = createAvatar(lorelei, {
      seed: Date.now().toString(),
      flip: Math.random() > 0.5,
      size: 64,
      radius: 25,
      backgroundColor: [this.generateRandomColor()],
      skinColor: ['f9e0d6', 'f5d0b4', 'e3c19a', 'c19e7d', '8c6e57'],
    });

    return avatar.toDataUriSync();
  }

  private generateRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colorsToSelect.length);

    const color = this.colorsToSelect[randomIndex];

    this.colorsToSelect.splice(randomIndex, 1);

    if (this.colorsToSelect.length === 0)
      this.colorsToSelect.push(...GenerateAvatarService.BACKGROUND_COLORS);

    return color;
  }
}
