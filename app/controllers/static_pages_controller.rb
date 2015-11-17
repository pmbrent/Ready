class StaticPagesController < ApplicationController

  before_action :ensure_logged_in

  def index
  end

private
  def ensure_logged_in
    if !logged_in?
      redirect_to root_url
    end
  end
end
