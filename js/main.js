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
const toggleCommentButton = (postID) => {
    if(!postID){
        return undefined;
    }
    const button = document.querySelector(`[data-post-id="${postID}"]`);
    if (button){
        if(button.textContent == "Show Comments"){
            button.textContent = "Hide Comments"
        }
        else if(button.textContent == "Hide Comments"){
            button.textContent = "Show Comments"
        } 
        
    }
    return button
   
}
//* #5
const deleteChildElements = (parentElement) => {
    if(!parentElement || !(parentElement instanceof HTMLElement)){
        return undefined;
    }
    let child = parentElement.lastElementChild
    if(child){
        while(child){
            parentElement.removeChild(child)
            child = parentElement.lastElementChild
        }
    }
    
    return parentElement;
}
//* #6
const addButtonListeners = () => {
    const buttons = document.querySelectorAll("main button");
    if(buttons){
        for(let i = 0; i < buttons.length; i++){
            const postID = buttons[i].dataset.postID
            if(postID){
                buttons[i].addEventListener("click", function (){
                    toggleComments("click", postID);
                })
            }
        }
    }
    return buttons;
}

//* #7
const removeButtonListeners = () => {
    const buttons = document.querySelectorAll("main button");
    if(buttons){
        for(let i = 0; i < buttons.length; i++){
            const postID = buttons[i].dataset.postID
            if(postID){
                buttons[i].removeEventListenerEventListener("click", function (){
                    toggleComments("click", postID);
                })
            }
        }
    }
    return buttons;
}

//* #8
const createComments = (comments) => {
    if(!comments){
        return undefined;
    }
    const fragment = document.createDocumentFragment();
    for(const comment of comments){
        const article = document.createElement("article");
        const h3 = createElemWithText('h3', comment.name);
        const p = createElemWithText('p', comment.body);
        const p2 = createElemWithText('p', `From: ${comment.email}`);
        article.append(h3,p,p2); 
        fragment.append(article)
    }
    return fragment
}

//* #9
const populateSelectMenu = (users) => {
    if(!users){
        return undefined;
    }
    const menu = document.getElementById("selectMenu")
    const options = createSelectOptions(users);
    for(const option of options){
        menu.append(option);
    }
    return menu
}

//* #10
const getUsers = async () => {
    try{
        const userData = await fetch("https://jsonplaceholder.typicode.com/users")
        if(!userData.ok) throw new Error("Status code not in 200-299 range");
        return await userData.json();
    } catch(error){
        console.error(error);
    }
}

//* #11
const getUserPosts = async (userID) => {
    if(!userID){
        return undefined;
    }
    try {
        const userPosts = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}/posts`)
        if(!userPosts.ok) throw new Error("Status code not in 200-299 range");
        return await userPosts.json();
    } catch (error) {
        console.error(error);
    }
}
//* #12
const getUser = async (userID) => {
    if(!userID){
        return undefined;
    }
    try {
        const user = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
        if(!user.ok) throw new Error("Status code not in 200-299 range");
        return await user.json();
    } catch (error) {
        console.error(error);
    }
}
//* #13
const getPostComments = async (postID) => {
    if(!postID){
        return undefined;
    }
    try {
        const postComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`)
        if(!postComments.ok) throw new Error("Status code not in 200-299 range");
        return await postComments.json();
    } catch (error) {
        console.error(error);
    }
}


//* #17
const toggleComments = (event, postID) =>{

}