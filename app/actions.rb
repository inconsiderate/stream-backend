enable :sessions

before do 
	@user ||= User.find(session[:user_id]) if session[:user_id]
end

get '/' do
  erb :'index'
end

post '/logout' do 
	session.clear
	@user = nil
	redirect '/'
end

post '/login' do
	@user = User.find_by email: params[:email]
	if @user && (@user.password == params[:password])
		session[:user_id] = @user.id
		redirect '/'
	else 
		redirect '/new'
	end
end

get '/new' do
	erb :'/new'
end

post '/new' do 
  @user = User.create!(
		email: params[:email])
  @user.password = params[:password]
  @user.save!
	session[:user_id] = @user.id
	redirect '/'
end

post '/links' do
	link = Link.create!(
		url: params[:url],
		user_id: session[:user_id],
		title: params[:title]
		)

	link.to_json
end

#TODO: new links bypass last(5) 

get '/links' do
	if @user
		if params[:pos].to_i >= Link.count
			current_pos = params[:pos].to_i - 5
		elsif params[:pos]
			current_pos = params[:pos].to_i
		else
			current_pos = 0
		end
		@links = @user.links.limit(5).offset(current_pos)
	 	@links.to_json 
 	else
	 	redirect "/"
	end
end

delete '/remove' do
	Link.find(params[:id]).destroy
		response = {
			:status => "ok"
		}
  response.to_json
end

post '/settings' do
	@user.background_url = params[:url]
	@user.greeting = params[:greeting]
	@user.font_colour = params[:font_colour]
	@user.save!
	redirect '/'
end




