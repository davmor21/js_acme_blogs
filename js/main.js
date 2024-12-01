//* #1
function createElemWithText (element = "p", textContent = "", className){
    let createdElement = document.createElement(element);
    createdElement.textContent = textContent;
    if(className){
        createdElement.className = className;
    }
    return createdElement;
}
//* #2
const createSelectOptions = (users) => {
    if(!users){
        return undefined;
    }

    const optionsArray = [];

    for(const user of users){
        const newOption = document.createElement("option");

        newOption.value = user.id
        newOption.textContent = user.name
        optionsArray.push(newOption);
    }
    return optionsArray;
}
//* #3
const toggleCommentSection = (postID) => {
    if(!postID){
        return undefined;
    }
    const section = document.querySelector(`[data-post-id="${postID}"]`);
    if(section){
       section.classList.toggle("hide")
    }
    return section;
}
//* #4