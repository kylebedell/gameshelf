class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def amazon
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted? || @user.save
      sign_in @user, :event => :authentication #this will throw if @user is not activated
      redirect_to usersgames_random_path
      set_flash_message(:notice, :success, :kind => "Amazon") if is_navigational_format?
    else
      session["devise.amazon_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

  def failure
    redirect_to usersgames_random_path
  end
end
