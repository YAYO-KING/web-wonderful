/**
 * Created by yanyue on 2020/4/1 21:17
 */
const express = require("express");
const router = express.Router();
const {UPLOAD_PATH} = require("../utils/constant");
const Result = require("../models/Result");
const Book = require("../models/Book");
const boom = require('boom')

//multer文件上传工具
const multer = require("multer");

router.post("/upload", multer({dest: UPLOAD_PATH}).single("file"), function (req, res, next) {
        if (!req.file || req.file.length === 0) {
            new Result("上传失败").fail(res);
        } else {
            new Result("上传成功").success(res);
        }
    }
);

//上传电子书接口   dest文件上传的目标位置 single上传单个文件
router.post("/uploadbook", multer({dest: `${UPLOAD_PATH}\\book`}).single("file"), function (req, res, next) {
        if (!req.file || req.file.length === 0) {
            new Result("上传电子书失败").fail(res);
        } else {
            const book = new Book(req.file);
            book.parse()
                .then(book => {
                    console.log('book', book);
                    new Result(book, '上传电子书成功').success(res)
                })
                .catch(err => {
                    next(boom.badImplementation(err))
                })
        }
    }
);

module.exports = router;
