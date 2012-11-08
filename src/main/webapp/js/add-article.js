/*
 * Copyright (c) 2012, B3log Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview add-article.
 *
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @version 1.0.0.5, Nov 8, 2012
 */

/**
 * @description Add article function.
 * @static
 */
var AddArticle = {

    /**
     * @description 发布文章
     */
    add: function () {
        if (Validate.goValidate([{
            "id": "articleTitle",
            "type": 256,
            "msg": Label.articleTitleErrorLabel
        }, {
            "id": "articleContent",
            "type": 1048576,
            "msg": Label.articleContentErrorLabel
        }, {
            "id": "articleTags",
            "type": "tags",
            "msg": Label.articleTagsErrorLabel
        }])) {
            var requestJSONObject = {
                articleTitle: $("#articleTitle").val().replace(/(^\s*)|(\s*$)/g,""),
                articleContent: $("#articleContent").val(),
                articleTags: $("#articleTags").val().replace(/(^\s*)|(\s*$)/g,""),
                syncWithSymphonyClient: $("#syncWithSymphonyClient").prop("checked")
            };
            
            $.ajax({
                url: "/article",
                type: "PUT",
                cache: false,
                data: JSON.stringify(requestJSONObject),
                beforeSend: function () {
                    $(".form button.red").attr("disabled", "disabled").css("opacity", "0.3");
                },
                success: function(result, textStatus){
                    $(".form button.red").removeAttr("disabled").css("opacity", "1");
                    if (result.sc) {
                        window.location = "/member/" + Label.userName;
                    } else {
                        $("#addArticleTip").addClass("tip-error").text(result.msg).css({
                            "border-left": "1px solid #E2A0A0",
                            "top": "-35px",
                            "width": "985px"
                        });
                    }
                },
                complete: function () {
                    $(".form button.red").removeAttr("disabled").css("opacity", "1"); 
                }
            });
        }
    },
    
    /**
 * @description 初识化发文页面
 */
    init: function () {
    }
};
