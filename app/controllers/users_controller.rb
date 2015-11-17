class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    if @user.save
      log_in(@user)
    else
      redirect_to new_session_url
    end
  end

  def index
    @users = User.all
    render json: @users
  end

private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
