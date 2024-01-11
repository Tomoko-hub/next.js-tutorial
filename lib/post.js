import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from 'remark-html';

const postDirectory = path.join(process.cwd(), "posts");

// fetch data from md file
export function getPostsData(){
    const fileNames = fs.readdirSync(postDirectory);
    const allPostsData = fileNames.map((fileName)=>{
        const id = fileName.replace(/\.md$/, ""); // file name = id

        //read mark downfile as string
        const fullPath = path.join(postDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        //return id and data
        return {
            id,
            ...matterResult.data,

        };
    });

    return allPostsData;
}

//getStaticPath returnで使うpath
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postDirectory);
    return fileNames.map((fileName)=>{
        return {
            params : {
                id: fileName.replace(/\.md$/, "")
            },
        }
    })
}

//return blog data from id(params)
export async function getPostData(id){
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);

    const blogContent = await remark()
    .use(html)
    .process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    };
}

