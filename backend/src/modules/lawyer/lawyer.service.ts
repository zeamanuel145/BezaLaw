import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lawyer } from './schemas/lawyer.schema';

@Injectable()
export class LawyerService {
  constructor(@InjectModel(Lawyer.name) private lawyerModel: Model<Lawyer>) {}

  async getLawyerProfile(): Promise<Lawyer | null> {
    return this.lawyerModel.findOne();
  }

  async createOrUpdateLawyer(
    lawyerData: Partial<Lawyer>,
  ): Promise<Lawyer | null> {
    const existingLawyer = await this.lawyerModel.findOne();
    if (existingLawyer) {
      return this.lawyerModel.findByIdAndUpdate(
        existingLawyer._id,
        lawyerData,
        { new: true },
      );
    }
    return this.lawyerModel.create(lawyerData);
  }

  async updateGoogleTokens(
    accessToken: string,
    refreshToken?: string,
  ): Promise<Lawyer | null> {
    return this.lawyerModel.findOneAndUpdate(
      {},
      {
        googleAccessToken: accessToken,
        ...(refreshToken && { googleRefreshToken: refreshToken }),
      },
      { new: true },
    );
  }
}
