import {ICategory, ICategoryWithSub} from "@/App/modules/Category/category.types";
import {Types} from "mongoose";

const groupByParentId = (data: ICategory[] | ICategoryWithSub[]) => {
    // console.log({data})
    // @ts-ignore
    let tempList: ICategoryWithSub[] = [];
    //parent category listing
    const parentCategory = data.filter(p => p.parentId === null)
    for (let p of parentCategory) {
        tempList.push({...p, subCategory: []})
    }

    //children listing
    for (let x of data) {
        const modifiedData = {...x, subCategory: []}

        // @ts-ignore
        const isExitsInTemp = (tempList as ICategory[]).find((tempC) =>
            new Types.ObjectId(tempC._id).equals(new Types.ObjectId(x._id))
        )
        if (!isExitsInTemp) {
            const parentIdInfo = x.parentId && (tempList as ICategoryWithSub[]).find((s) =>
                new Types.ObjectId(x.parentId?._id).equals(new Types.ObjectId(s._id))
            )
            if (!parentIdInfo) {
                tempList.push(modifiedData);
            } else {
                parentIdInfo.subCategory?.push(modifiedData)
                const previous = tempList.filter((f) => !new Types.ObjectId(f._id).equals(new Types.ObjectId(parentIdInfo._id)))
                tempList = [...previous, parentIdInfo]
            }
        }
    }
    return tempList
}

export const CategoryUtils = {
    groupByParentId
}