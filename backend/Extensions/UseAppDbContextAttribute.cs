using System.Reflection;
using MoodTracker.Data;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;

namespace MoodTracker.Extensions
{
    public class UseAppDbContextAttribute : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(
            IDescriptorContext context,
            IObjectFieldDescriptor descriptor,
            MemberInfo member)
        {
            descriptor.UseDbContext<AppDbContext>();
        }
    }
}
