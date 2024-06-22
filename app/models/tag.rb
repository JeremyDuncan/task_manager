class Tag < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tasks

  validates :name, presence: true, uniqueness: { scope: :user_id, message: "You already have a Tag with this name" }
end
