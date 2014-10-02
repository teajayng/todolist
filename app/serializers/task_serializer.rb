class TaskSerializer < ActiveModel::Serializer
  attributes :id, :text, :completed
end
