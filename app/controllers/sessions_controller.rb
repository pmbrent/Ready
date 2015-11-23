class SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(user_params[:info], user_params[:password])
    if @user
      log_in(@user)
      render json: current_user, only: [:id, :name, :email]
    else
      @user = User.new
      render json: {errors: ["Please recheck your login information."], status: 401}
    end
  end

  def show
    unless current_user
      render json: {}
    else
      @user = current_user
      render json: @user.as_json(only: [:id, :name, :email],
                                  include: {
                                    shelves: {
                                      include: {
                                        books: {only: [:title, :id, :isbn]}
                                      }
                                    }, friends: {only: :id}
                                  })
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    render json: {}
  end

private
  def user_params
    params.require(:user).permit(:info, :password)
  end

end
