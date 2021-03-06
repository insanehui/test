#!/bin/bash

# 将目录里的代码合并，并删除注释和空行

# 使用sed命令来处理注释
# 对于多行注释，能删除大部分常用写法，对于一些变态的写法不适用

echo "####################################################################################"
echo "#                                                                                  #"
echo "#                     Merge Code Files                                             #"
echo "#                                                                                  #"
echo "#  Remove all comments and empty lines, and merge into result.log                  #"
echo "#                                                                                  #"
echo "####################################################################################"

mergeFile=result.log
dir=${1:-.} 

index=0
start=$(date +%s)

function readFile() {
    let index++
    echo "[${index}] "$1

    echo -e "\n"$(basename $1) >> $mergeFile

    # delete the comment line begin with '//comment'
    # delete the comment line end with '//comment'
    # delete the comment only occupied one line '/* comment */'
    # delete the comment that occupied many lines '/*comment
    #                                               *comment
    #                                               */
    # delete xml comment
    #     <!---  --->
    #   or  <!---
    #       --->
    # cat myfile.xml | sed '/<!--.*-->/d' | sed '/<!--/,/-->/d' > cleaned.xml
    sed '/^[ \t]*\/\//d' $1 | \
    sed 's/\/\/[^\"]*//' | \
    sed 's/\/\*.*\*\///' | \
    sed '/^[ \t]*\/\*/,/.*\*\//d' >> $mergeFile
}

function dealDirectory() {
    if [ -d $1 ]
    then
        for element in `ls $1`
        do 
            dir_or_file=$1"/"$element
            if [ -d $dir_or_file ]
            then
                dealDirectory $dir_or_file
            else
                if [ ${dir_or_file##*.} == 'js' ]
                then
                    readFile $dir_or_file
                fi
            fi
        done
    else
        readFile $1
    fi
}

: > $mergeFile

dealDirectory $dir
# dealDirectory "./AcrossRoleMapper.java"

# sed -i '/^$/d' $mergeFile
# 删除空白行
sed -i '/^\s*$/d' $mergeFile

echo -e "\nFinished"
echo -e "    File Count: "${index}
echo -e "    Line Count: "$(awk '{print NR}' $mergeFile | tail -n1)
end=$(date +%s) && echo "    Time consumed: "$(( $end - $start ))" s"
