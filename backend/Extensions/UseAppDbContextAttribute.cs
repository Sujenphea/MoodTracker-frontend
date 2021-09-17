using System.Reflection;
using finalMoodTracker.Data;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;

namespace finalMoodTracker.Extensions
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
