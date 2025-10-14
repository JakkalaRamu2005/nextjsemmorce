
const blogs =[
        {id:1, title:"First Blog", content:"This is the content of the first blog."},
        {id:2, title:"Second Blog", content:"This is the content of the second blog."},
        {id:3, title:"Third Blog", content:"This is the content of the third blog."}
    ]

export async function GET(request){
    
   

    return new Response(JSON.stringify(blogs),{
        status: 200,
        headers:{'Content-Type':'application/json'}
    })
    
}

export async function GETBYID(request){
    const {Id} = request.params;
    const blog = blogs.find(blog => blog.id === Id);

    if (!blog) {
        return new Response(JSON.stringify({ error: "Blog not found" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify(blog), {
        status: 200,
        headers:{'Content-Type':'application/json'}
    })
}