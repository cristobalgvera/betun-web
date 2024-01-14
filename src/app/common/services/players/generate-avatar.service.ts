import { Injectable } from '@angular/core';
import { lorelei } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { PlayerDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class GenerateAvatarService {
  generateAvatarUri(): PlayerDto['avatarUri'] {
    const avatar = createAvatar(lorelei, {
      seed: Date.now().toString(),
      flip: Math.random() > 0.5,
      size: 64,
      radius: 25,
      // TODO: Define background colors
      backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'],
      skinColor: ['f9e0d6', 'f5d0b4', 'e3c19a', 'c19e7d', '8c6e57'],
    });

    return avatar.toDataUriSync();
  }
}
