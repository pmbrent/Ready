class SessionsController < ApplicationController

  def new
    if logged_in?
      redirect_to root_url
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
    redirect_to new_session_url
  end

private
  def user_params
    params.require(:user).permit(:info, :password)
  end

end
