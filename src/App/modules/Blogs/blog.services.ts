// get all blogs with pagination
import {calculatePagination, manageSorting, MongoQueryHelper} from "@/Utils/helper/queryOptimize";
import {IQueryItems} from "@/Utils/types/query.type";
import {IBlog} from "@/App/modules/Blogs/blog.type";
import {BlogModel} from "@/App/modules/Blogs/blog.model";
import {Types} from "mongoose";

const allBlogs = async (payload: IQueryItems<IBlog>) => {
    const {search} = payload.searchFields
    const {page, limit, skip} = calculatePagination(payload.paginationFields)
    const {sortBy, sortOrder} = manageSorting(payload.sortFields)

    const queryConditions = []

    //search condition
    if (search) {
        queryConditions.push({
            $or: ['title'].map((field) => {
                const fieldType = BlogModel.schema.path(field).instance
                return MongoQueryHelper(fieldType, field, search)
            })
        })
    }

    //filter conditions
    if (Object.entries(payload.filterFields).length > 0) {
        let tempConditions: {}[] = [];
        Object.entries(payload.filterFields).map(([key, value]) => {
            if (Object.keys(BlogModel.schema.obj).includes(key)) {
                if (key !== 'category') {
                    // mongoose schema keys
                    const fieldType = BlogModel.schema.path(key).instance
                    // return
                    tempConditions.push(MongoQueryHelper(fieldType, key, value as string))
                }
            } else if (key === 'tags') {
                tempConditions.push({
                    tags: {
                        $in: value
                    }
                })
            }
        })
        tempConditions.length && queryConditions.push({
            $and: tempConditions.map((condition) => condition)
        })
    }

    const query = queryConditions.length ? {$and: queryConditions} : {}

    const blogs: IBlog[] = await BlogModel.find(query)
        .sort({[sortBy]: sortOrder})
        .skip(skip)
        .limit(limit)
        .lean()

    const total = await BlogModel.countDocuments()
    return {
        data: blogs,
        meta: {
            page,
            limit,
            total
        },
    }
}

// get single blog
const singleBlog = async (slug: string) => {
    return BlogModel.findOne({slug}).lean()
}


// create blog
const createBlog = async (payload: IBlog) => {
    return BlogModel.create(payload)
}

// update blog
const updateBlog = async (id: string, payload: Partial<IBlog>) => {
    return BlogModel.findOneAndUpdate({_id: id}, payload, {
        new: true
    }).lean()
}

// delete blog
const deleteBlog = async (id: Types.ObjectId | string) => {
    const result = await BlogModel.deleteOne({_id: id}).lean()

    if (result.deletedCount > 0) {
        return true
    } else {
        return false
    }
}


export const BlogService = {
    allBlogs,
    singleBlog,
    createBlog,
    updateBlog,
    deleteBlog
}