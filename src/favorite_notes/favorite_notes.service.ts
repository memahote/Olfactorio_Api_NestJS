import { Injectable } from '@nestjs/common';
import { FavoriteNotesRepository } from './favorite_notes.repository';

@Injectable()
export class FavoriteNotesService {
  constructor(
    private readonly favoriteNotesRepository: FavoriteNotesRepository,
  ) {}

  async addToFavorite(userId: string, noteId: string) {
    return this.favoriteNotesRepository.create(userId, noteId);
  }

  async unfavorite(userId: string, noteId: string) {
    return this.favoriteNotesRepository.delete(userId, noteId);
  }
}
