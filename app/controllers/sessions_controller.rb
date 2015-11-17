class SessionsController < ApplicationController

  def new
    if logged_in?
      redirect_to static_pages_url
    end
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(user_params[:info], user_params[:password])
    if @user
      log_in(@user)
    else
      @user = User.new
      render :new
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    @user = User.new
  end

private
  def user_params
    params.require(:user).permit(:info, :password)
  end

end
