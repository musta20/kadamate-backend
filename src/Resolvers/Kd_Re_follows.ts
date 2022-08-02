import { Follows , InputFollows } from "src/modules/Kd_Mo_follows";
import { apiContext } from "src/utils/types";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class FollowsResolver {
    
  @Query(() => [Follows])
  AllFollows() {

    return Follows.find();
  }
  
  @UseMiddleware(Auth)
  @Mutation(() => Boolean)
  async Follows(
    @Ctx() { req }: apiContext,
    @Arg("userId") userId: number,
  ) {
    const MyId = req.session?.userId;
    const iserror = validateBill(BillInput);

    if (iserror)
      return {
        errors: iserror,
      };

    if (!List.length)
      return {
        errors: [{ field: "List", message: "يجب إضافة منتجات " }],
      };

    BillInput.UserID = MyId;
    const pdfName = Math.trunc(Math.random() * 1000) + "BILLNO";
    BillInput.PdfName = pdfName;
    const bill = await Bill.create(BillInput as Bill).save();


    let isErroList;
    List.every(async (item) => {
      item.UserId = MyId;
      item.BillId = bill._id;
      isErroList = validateProdect(item);
      if (isErroList) return;

      await Product.create(item as Product).save();
    });

    if (isErroList)
      return {
        errors: isErroList,
      };
    const UserData = await User.findOneBy({ _id: MyId });

    try {
      GenratePdf(pdfName, List, bill, UserData);
    } catch (e) {
      console.log(e);
    }

    return {
      Bill:bill
    };
  }
}