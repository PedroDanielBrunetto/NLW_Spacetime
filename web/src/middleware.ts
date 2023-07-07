import { NextRequest, NextResponse } from "next/server";

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

//Back-end for front-end
//back-end so pro front-end conseguir fazer algumas coisas que o front nao consegue fazer no Browser
//O next.js faz isso!

export function middleware(request: NextRequest){
  const token = request.cookies.get('token')?.value

  if (!token){
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; HttpOnly; Path=/; max-age=20`
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  //em quais caminhos (enderecos da minha aplicacao) eu quero obrigar que para o usuario acessar ele tem que estar logado
  matcher: '/memories/:path*'
  //quer que essa funcao seja chamada toda vez que o usuario tentar acessar uma rota que comece com /memories
}