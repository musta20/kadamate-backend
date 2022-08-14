import { isAuth } from "../middleware/Auth/isAuth";

import { UploadedFiles } from "../modules/Kd_Mo_uploaded_files";

import { apiContext } from "../utils/types";

import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

@Resolver()
export class UploadedFilesResulver {


  @UseMiddleware(isAuth)
  @Query(() => [UploadedFiles])
  async AllUploadedFilesMy(@Ctx() { req }: apiContext) {
    const MyId = req.session?.passport?.user.id;

    return await UploadedFiles.findBy({ user_id: MyId });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UploadedFiles)
  async RemoveFile(
    @Ctx() { req }: apiContext,
    @Arg("img_id") imgId: string
  ) {
    const MyId = req.session?.userId;

    const findImg = await UploadedFiles.findOneBy({_id:imgId,user_id:MyId})
    if(findImg){
    UploadedFiles.delete(findImg._id)
  }
  return true;
  }

}
