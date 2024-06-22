# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  def current
    if user_signed_in?
      render json: { user: current_user }
    else
      render json: { user: nil }
    end
  end

  def new
    redirect_to root_path
  end

  def create
    self.resource = warden.authenticate!(auth_options)
    if resource
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
      respond_with resource, location: after_sign_in_path_for(resource)
    else
      redirect_to root_path, alert: "Invalid email or password."
    end
  end

  protect_from_forgery with: :null_session, if: -> { request.format.json? }
end
